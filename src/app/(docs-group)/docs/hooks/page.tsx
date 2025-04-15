import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/modern-ui/button';
import { Card, CardDescription, CardTitle } from '@/components/modern-ui/card';
import { Badge } from '@/components/modern-ui/badge';
import { ArrowRightIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: "React Hooks | Modern UI",
  description: "Useful and reusable React hooks for your applications.",
};

const hooks = [
  {
    id: 'use-local-storage',
    name: 'useLocalStorage',
    description: 'Persist and sync state with localStorage across browser tabs',
    isNew: true,
  },
  {
    id: 'use-media-query',
    name: 'useMediaQuery',
    description: 'Detect and respond to CSS media query changes',
    isNew: true,
  },
  {
    id: 'use-debounce',
    name: 'useDebounce',
    description: 'Delay updates to state until a specified time has passed',
    isNew: true,
  },
  {
    id: 'use-click-away',
    name: 'useClickAway',
    description: 'Detect and respond to clicks outside of a specified element',
    isNew: false,
  },
];

export default function HooksPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">React Hooks</h1>
        <p className="text-muted-foreground mb-8">
          Collection of reusable React hooks to simplify common UI patterns and 
          interactions in your application.
        </p>

        <div className="grid gap-4">
          {hooks.map((hook) => (
            <Link 
              key={hook.id}
              href={`/docs/hooks/${hook.id}`} 
              className="block no-underline"
            >
              <Card className="p-6 hover:shadow-md transition-all duration-200 border">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2 flex items-center gap-2">
                      {hook.name}
                      {hook.isNew && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                          New
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {hook.description}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 