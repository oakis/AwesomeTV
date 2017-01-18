import React, { Component } from 'react';
import EpisodeContainer from './EpisodeContainer';

class EpisodeList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			episodes: []
		};
	}

	componentDidUpdate(nextProps) {
		if (this.props.episodeList !== nextProps.episodeList) {
			this.getEpisodes();
		}
	}

	getEpisode(id) {
		return fetch(`https://www.omdbapi.com/?i=${id}&plot=short&r=json`)
			.then((res) => res.json())
			.then((episode) => {
				return episode;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	getEpisodes() {
		const episodes = this.props.episodeList;
		const newArr = episodes.map((ep) => this.getEpisode(ep.imdbID));
		Promise.all(newArr)
			.then(allData => {
				this.setState({ episodes: allData });
			});
	}

	calcSeasonRating() {
		const episodes = this.state.episodes;
		const ratings = episodes.map((ep) => ep.imdbRating);
		let result = 0;
		for (let i = ratings.length - 1; i >= 0; i--) {
			result += parseInt(ratings[i], 10);
		}
		result /= (ratings.length - 1);
		return result.toString().slice(0, 4);
	}

	removeEpisode(i) {
		const newState = this.state.episodes;
		newState.splice(i, 1);
		this.setState({ episodes: newState });
	}

	renderEpisodes() {
		const episodes = this.state.episodes;
		return episodes.map((ep, i) => {
			return (
					<EpisodeContainer
						key={ep.imdbID}
						data={ep}
						index={i}
						remove={this.removeEpisode.bind(this)}
					/>
			);
		});
	}

	render() {
		return (
			<div>
				<div className="dashboard">
					<p>Title: {this.props.title}</p>
					<p>Season: {this.props.season}</p>
					<p>Season rating: {this.calcSeasonRating()}</p>
				</div>
				<div className="epList">
					{this.renderEpisodes()}
				</div>
			</div>
		);
	}

}

export default EpisodeList;
