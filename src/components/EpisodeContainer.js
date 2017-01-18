import React, { Component } from 'react';

class EpisodeContainer extends Component {
	
	getMonth(date) {
		const sliced = date.slice(3, 6);
		let result;
		switch (sliced) {
			case 'Jan':
				result = 'January';
				break;
			case 'Feb':
				result = 'February';
				break;
			case 'Mar':
				result = 'March';
				break;
			case 'Apr':
				result = 'April';
				break;
			case 'May':
				result = 'May';
				break;
			case 'Jun':
				result = 'June';
				break;
			case 'Jul':
				result = 'July';
				break;
			case 'Aug':
				result = 'August';
				break;
			case 'Sep':
				result = 'September';
				break;
			case 'Oct':
				result = 'October';
				break;
			case 'Nov':
				result = 'November';
				break;
			case 'Dec':
				result = 'December';
				break;
			default:
				break;
		}
		return result;
	}

	isEpisodeAwesome(rating) {
		const result = (rating >= 8.5) ? 'ratingAwesome' : 'ratingNormal';
		return result;
	}

	removeEp() {
		this.props.remove(this.props.index);
	}

	render() {
		const { Title, Released, Episode, Plot, Poster, imdbRating } = this.props.data;
		const containerClass = `epContainer ${this.isEpisodeAwesome(imdbRating)}`;
		return (
			<div className={containerClass}>
				<div className="epTitle"><h2>{Title}</h2></div>
				<div className="epEpisode">(#{Episode})</div>
				<div className="epImgContainer">
					<img src={Poster} role="presentation" className="epImg" />
				</div>
				<div className="epReleased"><em>{this.getMonth(Released)}</em></div>
				<div className="epimdbRating">IMDB Rating: {imdbRating}</div>
				<div className="epPlot">{Plot}</div>
				<button className="epButton" onClick={this.removeEp.bind(this)}>Remove</button>
			</div>
		);
	}
}

export default EpisodeContainer;
