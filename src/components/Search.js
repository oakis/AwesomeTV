import React, { Component } from 'react';
import EpisodeList from './EpisodeList';

class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			season: '',
			episodeList: [],
			searchTerm: 'Silicon Valley'
		};
		this.searchChanged = this.searchChanged.bind(this);
		this.searchItem = this.searchItem.bind(this);
	}

	componentWillMount() {
		this.chooseTitle(this.state.searchTerm);	
	}

	chooseTitle(title) {
		fetch(`http://www.omdbapi.com/?t=${title}&Season=1`, {
			method: 'GET'
		})
			.then((res) => res.json())
			.then((list) => {
				this.setState({
					title: list.Title,
					season: list.Season,
					episodeList: list.Episodes
				});
			});
	}

	searchChanged(event) {
		this.setState({
			searchTerm: event.target.value
		});
	}

	searchItem() {
		this.chooseTitle(this.state.searchTerm);
	}

	render() {
		return (
			<div>
				<input value={this.state.searchTerm} onChange={this.searchChanged} />
				<div className="searchContainer">
					<button onClick={this.searchItem}> Search </button>
				</div>
				<EpisodeList title={this.state.title} season={this.state.season} episodeList={this.state.episodeList} />
			</div>
		);
	}
}

export default Search;
