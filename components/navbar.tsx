import { Menu, Segment, Dropdown } from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";

export default function Navbar() {
    const [state, setState] = useState({ activeItem: "home" });
    const router = useRouter();
    let activeItem;
    if (router.pathname === "/") {
        activeItem = "home";
    } else if (router.pathname === "/about") {
        activeItem = "about";
    } else if (router.pathname === "/admin") {
        activeItem = "admin";
    }
    const handleItemClick = (e, { name }) => {
        if (name == "home") {
            router.push("/");
        } else if (name == "about") {
            router.push("/about");
        }
    };
    return (
        <div style={{ margin: "auto" }}>
            <Segment>
                {/* <Menu inverted pointing secondary color="green"> */}
                <Menu secondary size="large">
                    <Menu.Item
                        name="home"
                        active={activeItem === "home"}
                        onClick={handleItemClick}
                    >
                        <img src="/images/football.png" alt="logo" />
                        <div style={{ paddingLeft: "11px" }}>
                            Soccer Highlights Today
                        </div>
                    </Menu.Item>
                    <Menu.Item
                        name="about"
                        active={activeItem === "about"}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name="admin"
                        active={activeItem === "admin"}
                        onClick={() => {
                            router.push("/admin");
                        }}
                    />
                    <Dropdown item text="Competitions">
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                English Premier League
                            </Dropdown.Item>
                            <Dropdown.Item>La Liga</Dropdown.Item>
                            <Dropdown.Item>Bundesliga</Dropdown.Item>
                            <Dropdown.Item>Serie A</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>
            </Segment>
            {/* <img src="https://cdn.hipwallpaper.com/m/78/51/yon2i8.jpg" /> */}
        </div>
    );
}
