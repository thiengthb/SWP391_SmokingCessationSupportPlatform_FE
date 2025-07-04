import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Medal, Award } from "lucide-react";
import { useWebSocket } from "@/contexts/WebSocketContext";
import type { ScoreResponse } from "@/types/leaderboard";
import useApi from "@/hooks/useApi";
import { Separator } from "@radix-ui/react-separator";
import clsx from "clsx";
import { useAuth } from "@/contexts/AuthContext";

type LeaderboardListProps = {
    onMyScoreUpdate?: (score: ScoreResponse) => void;
};

export default function LeaderboardList({ onMyScoreUpdate }: LeaderboardListProps) {
    const [topScores, setTopScores] = useState<ScoreResponse[]>([]);
    const [myScore, setMyScore] = useState<ScoreResponse | null>(null);
    const { leaderboardData, subscribeToTopic } = useWebSocket();
    const { auth } = useAuth();
    const apiWithInterceptor = useApi();

    const getInitials = (name: string) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("");

    const handleScores = (scores: ScoreResponse[]) => {
        const top10 = scores.slice(0, 10);
        const myScore = scores[10]; //current user

        setTopScores(top10);

        if (myScore) {
            setMyScore(myScore);
            onMyScoreUpdate?.(myScore);
        }
    };

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Medal className="h-5 w-5 text-yellow-500" />;
            case 2:
                return <Medal className="h-5 w-5 text-gray-400" />;
            case 3:
                return <Medal className="h-5 w-5 text-amber-600" />;
            default:
                return <span className="font-bold">#{rank}</span>;
        }
    };

    useEffect(() => {
        if (leaderboardData?.length > 0) {
            handleScores(leaderboardData);
        }
    }, [leaderboardData]);

    useEffect(() => {
        const fetchInitial = async () => {
            try {
                const res = await apiWithInterceptor.get("/v1/scores");
                const scores: ScoreResponse[] = Array.isArray(res.data.result) ? res.data.result : [];
                handleScores(scores);
            } catch (e) {
                console.error("Failed to fetch scores:", e);
            }
        };

        fetchInitial();

        const unsubscribe = subscribeToTopic("/topic/leaderboard", (body) => {
            const updatedScores: ScoreResponse[] = JSON.parse(body);
            handleScores(updatedScores);
        });

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    return (
        <div className="space-y-4">
            {/* Top 10 */}
            {topScores.map((user, index) => {
                const rank = index + 1;
                return (
                    <Card key={user.username} className={clsx(
                            "p-4 transition-all duration-300",
                            auth.currentUser?.username == user.username && "border-2 border-primary bg-muted"
                        )}>
                        <div className="flex items-center gap-4">
                            <div className="w-3 text-center">{getRankIcon(rank)}</div>
                            <Avatar>
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">{user.username}</h3>
                                    <div className="flex items-center gap-2 text-right">
                                        <div className="font-bold">{user.score} pts</div>
                                        <Award className="h-4 w-4 text-primary relative top-[1px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                );
            })}

            {/* Separator */}
            {myScore && (
                <>
                    <div className="relative">
                        <Separator className="my-8" />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-muted-foreground text-sm">
                            Your Ranking
                        </span>
                    </div>

                    {/* Current User */}
                    <Card className="p-4 border-2 border-primary">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={myScore.avatar} />
                                <AvatarFallback>{getInitials(myScore.username)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">{myScore.username}</h3>
                                    <div className="flex items-center gap-2 text-right">
                                        <div className="font-bold">{myScore.score} pts</div>
                                        <Award className="h-4 w-4 text-primary relative top-[1px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </>
            )}
        </div>
    );
}
