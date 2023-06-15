'use client';

import { ShowMoreProps } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomButton from './customButton';
import { updateSearchParams } from '@/utils';
import { useEffect } from 'react';

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const persistentScroll = localStorage.getItem('persistentScroll');
    if (persistentScroll === null) return;

    window.scrollTo({ top: Number(persistentScroll) });

    if (Number(persistentScroll) === window.scrollY)
      localStorage.removeItem('persistentScroll');
  }, [searchParams]);

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newPathName = updateSearchParams('limit', `${newLimit}`);
    localStorage.setItem('persistentScroll', window.scrollY.toString());
    router.push(newPathName);
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
