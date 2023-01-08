import React, { useContext } from "react";
import Button from "../../components/Button/Button";
import GlobalContext from "../../context/GlobalContext";
import { team } from "../../SVGs";
import "./home.scss";

const Home = () => {
	const { isAuthenticated } = useContext(GlobalContext);
	return (
		<main className="home">
			<section className="home-left" style={{ backgroundImage: `url(${team})` }} />
			<section className="home-right">
				<h1>Intern Management</h1>
				<p>
					An application to manage interns for your buisness. A new way to manage your interns and keep track of their progress.
				</p>
				<div className="home-right__buttons">
					{
						isAuthenticated ? (
							<Button to="/dashboard" text="Dashboard" />
						) : (
							<>
								<Button text="Login as Intern" link="/login?role=intern" variant='outline' />
								<Button text="Login as Admin" link="/login?role=admin" variant='filled' />
							</>
						)
					}
				</div>
			</section>
		</main>
	);
};

export default Home;
