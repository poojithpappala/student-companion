
"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useActivities } from '@/hooks/use-activities';
import { usePodStore } from '@/hooks/use-pod-store';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, Gift, User } from 'lucide-react';
import { KudosButton } from './kudos-button';

const activityIcons = {
  'check-in': <CheckCircle className="h-5 w-5 text-green-500" />,
  'kudos': <Gift className="h-5 w-5 text-yellow-500" />,
};

export function ActivityFeed() {
  const { currentPod } = usePodStore();
  const { activities } = useActivities(currentPod?.id || null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} data-ai-hint="person face"/>
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{activity.user.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.content}</p>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </div>
                </div>
                <div className="mt-2">
                  <KudosButton initialKudos={activity.kudos} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
