
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function KudosButton({ initialKudos }: { initialKudos: number }) {
  const [kudos, setKudos] = useState(initialKudos);
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setKudos(liked ? kudos - 1 : kudos + 1);
    setLiked(!liked);
  };

  return (
    <motion.div whileTap={{ scale: 1.2, rotate: 10 }}>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={handleClick}
      >
        <Heart className={cn("h-4 w-4", liked && "fill-red-500 text-red-500")} />
        <span className="font-semibold">{kudos}</span>
      </Button>
    </motion.div>
  );
}
