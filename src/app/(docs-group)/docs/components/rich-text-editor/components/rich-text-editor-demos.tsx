"use client";

import { Button } from "@/components/modern-ui/button";
import { RichTextEditor } from "@/components/modern-ui/rich-text-editor";
import Mention from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import tippy from "tippy.js";

interface MentionListProps {
  items: string[];
  command: (item: { id: string }) => void;
}

interface MentionListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

const MentionList = forwardRef<MentionListRef, MentionListProps>(
  (props, ref) => {
    const { items, command } = props;
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = items[index];
      console.log(item);
      if (item) {
        command({ id: item });
      }
    };

    const upHandler = () => {
      setSelectedIndex(
        (prevIndex) => (prevIndex + items.length - 1) % items.length
      );
    };

    const downHandler = () => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }

        if (event.key === "Enter") {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <div className="bg-background rounded-md shadow-lg p-1 border w-fit min-w-32 max-w-64 max-h-[200px] overflow-y-auto z-50 relative">
        {items.length ? (
          items.map((item, index) => (
            <button
              type="button"
              key={index}
              onClick={() => selectItem(index)}
              className={`flex items-center gap-2 px-2 py-1 w-full text-left hover:bg-gray-100 rounded-sm text-sm ${
                index === selectedIndex ? "bg-blue-50" : ""
              }`}
            >
              <span className="w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full">
                {item.charAt(0)}
              </span>
              <span>{item}</span>
            </button>
          ))
        ) : (
          <div className="px-2 py-1 text-gray-500 text-sm">No results</div>
        )}
      </div>
    );
  }
);

MentionList.displayName = "MentionList";

export function BasicRichTextEditorDemo() {
  return <RichTextEditor className="w-full" />;
}

export function RichTextEditorWithPlaceholderDemo() {
  return (
    <RichTextEditor
      className="w-full"
      placeholder="Write your thoughts here..."
    />
  );
}

export function RichTextEditorWithCustomExtensionsDemo() {
  const [editorContent, setEditorContent] = useState(
    "<p>This editor supports @mentions. Try typing @ followed by a name.</p>"
  );

  // Định nghĩa extension mentions
  const mentionExtension = Mention.configure({
    HTMLAttributes: {
      class: "mention",
    },
    suggestion: {
      char: "@",
      allowSpaces: true,
      items: ({ query }: { query: string }) => {
        const users = [
          "Lea Thompson",
          "Cyndi Lauper",
          "Tom Cruise",
          "Madonna",
          "Jerry Hall",
          "Joan Collins",
          "Winona Ryder",
          "Christina Applegate",
          "Alyssa Milano",
          "Molly Ringwald",
        ];

        return users
          .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5);
      },

      render: () => {
        let component: ReactRenderer | null = null;
        let popup: any = null;

        return {
          onStart: (props: any) => {
            // Tạo renderer cho mention list
            component = new ReactRenderer(MentionList, {
              props,
              editor: props.editor,
            });

            if (!props.clientRect) return;

            // Tạo popup
            popup = tippy("body", {
              getReferenceClientRect: props.clientRect,
              appendTo: () => document.body,
              content: component.element,
              showOnCreate: true,
              interactive: true,
              trigger: "manual",
              placement: "top-start",
              arrow: true,
            });
          },

          onUpdate: (props: any) => {
            if (!component?.updateProps) return;

            component.updateProps(props);

            if (!props.clientRect) return;

            if (popup && popup[0]) {
              popup[0].setProps({
                getReferenceClientRect: props.clientRect,
              });
            }
          },

          onKeyDown: (props: any) => {
            if (props.event.key === "Escape") {
              if (popup && popup[0]) {
                popup[0].hide();
              }
              return true;
            }

            if (!component || !component.ref) return false;

            const ref = component.ref as { onKeyDown: (props: any) => boolean };
            return ref.onKeyDown(props);
          },

          onExit: () => {
            if (popup && popup[0]) {
              popup[0].destroy();
            }

            if (component) {
              component.destroy();
            }
          },
        };
      },
    },
  });

  return (
    <div className="w-full space-y-2">
      <RichTextEditor
        className="w-full"
        placeholder="Gõ @ để mention ai đó..."
        value={editorContent}
        onValueChange={setEditorContent}
        customExtensions={[mentionExtension as any]}
      />

      <style jsx global>{`
        .mention {
          background-color: #e8f5fe;
          color: #1da1f2;
          padding: 0.1rem 0.3rem;
          border-radius: 0.3rem;
          font-weight: 500;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
