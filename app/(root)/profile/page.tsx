import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';
import React from 'react';
import { ProfileForm } from './profile-form';

const ProfilePage = async () => {
   const session = await getUserSession();

   if (!session) {
      return redirect('/not-auth');
   }
   console.log(session);
   
   if (!session.id) {
      return redirect('/not-auth');
   }

   const user = await prisma.user.findFirst({ where: { id: Number(session.id) } });

   if (!user) {
      return redirect('/not-auth');
   }
   return <ProfileForm data={user} />;
};

export default ProfilePage;
