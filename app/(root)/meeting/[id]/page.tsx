'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';

import { useGetCallById } from '@/hooks/useGetCallById';
import Alert from '@/components/Alert';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';

const MeetingPage = () => {
    const params = useParams();
    const id = params?.id;

    const { isLoaded, user } = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false);

    // ✅ Always call hooks unconditionally
    const { call, isCallLoading } = useGetCallById(typeof id === 'string' ? id : '');

    // ✅ Then check if the ID is invalid
    if (typeof id !== 'string') {
        return (
            <p className="text-center text-3xl font-bold text-white">
                Invalid meeting ID
            </p>
        );
    }

    if (!isLoaded || isCallLoading) {
        return <Loader />;
    }

    if (!call) {
        return (
            <p className="text-center text-3xl font-bold text-white">
                Call Not Found
            </p>
        );
    }

    const notAllowed =
        call.type === 'invited' &&
        (!user || !call.state.members.find((m) => m.user.id === user.id));

    if (notAllowed) {
        return <Alert title="You are not allowed to join this meeting" />;
    }

    return (
        <main className="h-screen w-full">
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ? (
                        <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                    ) : (
                        <MeetingRoom />
                    )}
                </StreamTheme>
            </StreamCall>
        </main>
    );
};

export default MeetingPage;   update
