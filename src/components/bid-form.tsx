'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { ref, push, serverTimestamp } from 'firebase/database';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Gavel, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const bidFormSchema = z.object({
  teamName: z.string().min(2, {
    message: 'Team name must be at least 2 characters.',
  }),
  bidAmount: z.coerce.number().positive({
    message: 'Bid amount must be a positive number.',
  }),
});

type BidFormValues = z.infer<typeof bidFormSchema>;

export function BidForm() {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { toast } = useToast();
  const form = useForm<BidFormValues>({
    resolver: zodResolver(bidFormSchema),
    defaultValues: {
      teamName: '',
      bidAmount: undefined,
    },
  });

  async function onSubmit(data: BidFormValues) {
    try {
      await push(ref(db, 'bids'), {
        ...data,
        timestamp: serverTimestamp(),
      });
      form.reset({ teamName: '', bidAmount: undefined });
      toast({
        title: 'Bid Placed!',
        description: 'Your bid has been successfully recorded.',
      });
    } catch (error) {
      console.error('Error writing to Firebase', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to place your bid. Please try again.',
      });
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-medium font-headline">
          Place Your Bid
        </CardTitle>
        <Gavel className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. The High Rollers" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bidAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bid Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                        $
                      </span>
                      <Input
                        type="number"
                        placeholder="1000"
                        className="pl-7"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Placing Bid...' : 'Place Bid'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
