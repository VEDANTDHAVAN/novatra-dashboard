'use client';

import { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase';
import {
  ref,
  onValue,
  query,
  orderByChild,
  limitToLast,
} from 'firebase/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List, TrendingUp } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

type Bid = {
  id: string;
  teamName: string;
  bidAmount: number;
  timestamp: number;
};

export function LiveBids() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const newBidsRef = useRef<Set<string>>(new Set());
  
  useEffect(() => {
    const bidsRef = query(
      ref(db, 'bids'),
      orderByChild('timestamp'),
      limitToLast(20)
    );
    const unsubscribe = onValue(
      bidsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const bidsList: Bid[] = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          const sortedBids = bidsList.sort((a, b) => b.timestamp - a.timestamp);

          if (bids.length > 0) {
            const existingIds = new Set(bids.map(b => b.id));
            sortedBids.forEach(b => {
              if (!existingIds.has(b.id)) {
                newBidsRef.current.add(b.id);
              }
            });
          }

          setBids(sortedBids);
        } else {
          setBids([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (newBidsRef.current.size > 0) {
      const timer = setTimeout(() => {
        newBidsRef.current.clear();
        setBids(prevBids => [...prevBids]); // force re-render to remove highlight
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [bids]);


  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium font-headline">
          Live Bids
        </CardTitle>
        <List className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <div className="h-full overflow-y-auto pr-2">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                 <div key={i} className="flex justify-between items-center p-3 rounded-lg">
                   <Skeleton className="h-5 w-2/4" />
                   <Skeleton className="h-5 w-1/4" />
                 </div>
              ))}
            </div>
          ) : bids.length > 0 ? (
            <ul className="space-y-3">
              {bids.map((bid, index) => (
                <li
                  key={bid.id}
                  className={`flex justify-between items-center p-3 rounded-lg transition-all duration-500 ${newBidsRef.current.has(bid.id) ? 'bg-primary/20 scale-105' : 'bg-secondary'}`}
                >
                  <p className="font-semibold text-secondary-foreground truncate mr-4">
                    {bid.teamName}
                  </p>
                  <p className="font-bold text-primary tabular-nums whitespace-nowrap">
                    ${new Intl.NumberFormat().format(bid.bidAmount)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 flex flex-col items-center justify-center h-full">
              <TrendingUp className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="font-semibold text-muted-foreground">No bids yet.</p>
              <p className="text-sm text-muted-foreground">
                Be the first to place a bid!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
