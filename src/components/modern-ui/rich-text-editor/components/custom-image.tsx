"use client";

import { cn } from "@/lib/utils";
import Image from "@tiptap/extension-image";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { X } from "lucide-react";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const useEvent = <T extends (...args: any[]) => any>(handler: T): T => {
  const handlerRef = useRef<T | null>(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    if (handlerRef.current === null) {
      throw new Error("Handler is not assigned");
    }
    return handlerRef.current(...args);
  }, []) as T;
};

// Custom Image extension with delete button
export const CustomImage = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer((props: any) => {
      const deleteNode = () => {
        if (!props.editor) return;

        try {
          const pos = props.getPos();

          if (typeof pos !== "number") return;

          const { state } = props.editor;
          const tr = state.tr;

          const node = tr.doc.nodeAt(pos);

          if (node) {
            tr.delete(pos, pos + node.nodeSize);
            props.editor.view.dispatch(tr);
          }
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      };

      const containerRef = useRef<HTMLDivElement>(null);
      const imgRef = useRef<HTMLImageElement>(null);
      const [editing, setEditing] = useState(false);
      const [isResizing, setIsResizing] = useState(false);
      const [resizingStyle, setResizingStyle] = useState<
        Pick<CSSProperties, "width"> | undefined
      >();

      // Lots of work to handle "not" div click events.
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
          if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
          ) {
            setEditing(false);
          }
        };
        // Add click event listener and remove on cleanup
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, [editing]);

      // Prevent drag while resizing
      useEffect(() => {
        if (isResizing && containerRef.current) {
          const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
          };

          containerRef.current.addEventListener("dragstart", handleDragStart);

          return () => {
            containerRef.current?.removeEventListener(
              "dragstart",
              handleDragStart
            );
          };
        }
      }, [isResizing]);

      const handleMouseDown = useEvent(
        (
          event:
            | React.MouseEvent<HTMLDivElement>
            | React.TouchEvent<HTMLDivElement>
        ) => {
          if (!imgRef.current) return;
          setEditing(true);
          setIsResizing(true);

          const direction = event.currentTarget.dataset.direction || "--";
          const initialXPosition = event.type.includes("mouse")
            ? (event as React.MouseEvent<HTMLDivElement>).clientX
            : (event as React.TouchEvent<HTMLDivElement>).touches[0].clientX;
          const currentWidth = imgRef.current.clientWidth;
          let newWidth = currentWidth;
          const transform = direction === "w" ? -1 : 1;

          // Prevent default drag behavior
          const preventDrag = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
          };
          window.addEventListener("dragstart", preventDrag);

          const mouseMoveHandler = (event: MouseEvent | TouchEvent) => {
            event.cancelable && event.preventDefault();
            const currentPosition =
              event instanceof MouseEvent
                ? event.clientX
                : event.touches[0].clientX;
            newWidth =
              currentWidth + transform * (currentPosition - initialXPosition);
            // Ensure minimum width of 200px
            newWidth = Math.max(200, newWidth);
            setResizingStyle({ width: newWidth });
            // If mouse is up, remove event listeners
            // TODO: what about if touch is up?
            if ("buttons" in event && !event.buttons) removeListeners();
          };

          const removeListeners = () => {
            window.removeEventListener("mousemove", mouseMoveHandler);
            window.removeEventListener("mouseup", removeListeners);
            window.removeEventListener("touchmove", mouseMoveHandler);
            window.removeEventListener("touchend", removeListeners);
            window.removeEventListener("dragstart", preventDrag);
            setEditing(false);
            setIsResizing(false);
            // Ensure minimum width of 200px
            newWidth = Math.max(200, newWidth);
            // Update the node attributes with the new width
            props.updateAttributes({ width: newWidth });
            // Set final width explicitly
            setResizingStyle({ width: newWidth });
          };

          window.addEventListener("mousemove", mouseMoveHandler);
          window.addEventListener("mouseup", removeListeners);
          // passive false to prevent scroll on mobile while resizing
          window.addEventListener("touchmove", mouseMoveHandler, {
            passive: false,
          });
          window.addEventListener("touchend", removeListeners, {
            passive: false,
          });
        }
      );

      const dragCornerButton = (direction: string, className?: string) => (
        <div
          role="button"
          tabIndex={0}
          data-direction={direction}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onClick={() => setEditing(true)}
          onBlur={() => setEditing(false)}
          className={cn(
            `absolute top-1/2 h-16 w-1.5 -translate-y-1/2 transform rounded-md !bg-muted group-hover:bg-muted`,
            className,
            editing && "bg-muted-foreground"
          )}
        ></div>
      );

      return (
        <NodeViewWrapper
          ref={containerRef}
          as="div"
          draggable={!isResizing}
          data-drag-handle
          onMouseDown={() => setEditing(true)}
          onTouchStart={() => setEditing(true)}
          onBlur={() => setEditing(false)}
          style={{
            display: "table",
            // Weird! Basically tiptap/prose wraps this in a span and the line height causes an annoying buffer.
            lineHeight: "0px",
          }}
          className={`relative group my-6 overflow-visible sm:my-8 ${props.node.attrs.align}`}
        >
          <div className="relative inline-block group">
            <img
              {...props.node.attrs}
              ref={imgRef}
              style={{
                ...resizingStyle,
                width: resizingStyle?.width || props.node.attrs.width,
              }}
              className={cn(
                editing && `cursor-default ring-1 ring-foreground`,
                "max-w-full rounded-md border group-hover:brightness-80 transition-all",
                isResizing && "!brightness-100"
              )}
              alt={props.node.attrs.alt || "img"}
            />
            <X
              size={12}
              onClick={deleteNode}
              className={cn(
                "absolute top-1 right-1 text-white w-5 h-5 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity",
                isResizing && "hidden"
              )}
            />
          </div>
          <div>
            {dragCornerButton(
              "w",
              cn(
                "left-2 hidden group-hover:block cursor-w-resize",
                isResizing && "block"
              )
            )}
            {dragCornerButton(
              "e",
              cn(
                "right-2 hidden group-hover:block cursor-e-resize",
                isResizing && "block"
              )
            )}
          </div>
        </NodeViewWrapper>
      );
    });
  },
});
