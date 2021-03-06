import React, { useEffect, useState } from "react";
import { Divider, Header, Loader, Grid, Image } from "semantic-ui-react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/League.module.css";
import Link from "next/link";
import MatchProps from "../../api/interface";

interface LeagueGameProps {
    LeagueGames: MatchProps[];
}

export default function League({ LeagueGames }: LeagueGameProps) {
    const router = useRouter();
    const LeagueID = router.query.id;
    const LeagueData = LeagueGames.filter(
        (game) => game.competition.id.toString() === LeagueID
    );
    return (
        <div style={{ width: "90%", margin: "auto" }}>
            <Header as="h2" style={{ paddingTop: 30 }}>
                {LeagueData[0].competition.name.split(":")[1]}
            </Header>
            <Divider />
            <Grid columns={3}>
                <Grid.Row>
                    {LeagueData.map((game) => (
                        <Grid.Column>
                            <Link href={`/view/${LeagueGames.indexOf(game)}`}>
                                <a>
                                    <div className={styles.HighlightDiv}>
                                        <Image src={game.thumbnail} />
                                        <strong style={{ fontSize: "18px" }}>
                                            {game.title}
                                        </strong>
                                    </div>
                                </a>
                            </Link>
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (!context.req) {
        return {
            props: {
                match: [],
            },
        };
    }
    // const id: number = Number(context?.params?.id);
    const res = await axios.get("https://www.scorebat.com/video-api/v1");
    // const data: MatchProps[] = res.data.filter(
    //     (game: MatchProps) => game.competition.id === id
    // );
    const data: MatchProps[] = res.data;
    return {
        props: {
            LeagueGames: data,
        },
    };
};
