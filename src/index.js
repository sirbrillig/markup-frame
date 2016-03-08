import React from 'react';
import debugFactory from 'debug';

const noop = () => null;
const debug = debugFactory( 'calypso:site-preview' );

export default React.createClass( {
	displayName: 'MarkupFrame',

	propTypes: {
		// The markup to display in the preview.
		markup: React.PropTypes.string.isRequired,
		// The handler to call when an element is clicked. Will be passed the event.
		onClick: React.PropTypes.func,
		// The handler to call when a link is clicked. Will be passed the target URL.
		onClickLink: React.PropTypes.func,
		// The function to call when the DOM is loaded. Will be passed the DOM.
		onLoad: React.PropTypes.func,
	},

	getDefaultProps() {
		return {
			markup: '',
			onClick: noop,
			onClickLink: noop,
			onLoad: noop,
		};
	},

	componentDidMount() {
		this.updateFrameContent( this.props.markup );
	},

	componentDidUpdate() {
		this.updateFrameContent( this.props.markup );
	},

	shouldComponentUpdate( nextProps ) {
		if ( this.hasMarkupChanged( this.props.markup, nextProps.markup ) ) {
			debug( 'markup has changed; re-rendering preview' );
			return true;
		}
		return false;
	},

	hasMarkupChanged( oldMarkup, newMarkup ) {
		return ( oldMarkup !== newMarkup );
	},

	updateFrameContent( content ) {
		debug( 'adding content to iframe', content.length );
		this.iframe.addEventListener( 'load', this.finishPreviewLoad );
		if ( ! this.iframe.contentWindow || ! this.iframe.contentWindow.document ) {
			throw new Error( 'The iframe could not be used because it has no document object' );
		}
		this.iframe.contentWindow.document.open();
		this.iframe.contentWindow.document.write( content );
		this.iframe.contentWindow.document.close();
	},

	finishPreviewLoad() {
		this.props.onLoad( this.iframe.contentWindow.document );
		const domLinks = Array.prototype.slice.call( this.iframe.contentWindow.document.querySelectorAll( 'a' ) );
		debug( `disabling ${domLinks.length} links in preview` );
		domLinks.map( this.disableLink );
		this.iframe.contentWindow.document.body.onclick = this.handleClick;
	},

	disableLink( element ) {
		const url = element.href;
		element.href = '#';
		element.onClick = () => this.handleClickLink( url );
	},

	handleClickLink( url ) {
		debug( 'click on link detected for url', url );
		this.props.onClickLink( url );
	},

	handleClick( event ) {
		debug( 'click detected for element', event.target );
		this.props.onClick( event );
	},

	saveIframe( el ) {
		this.iframe = el;
	},

	render() {
		return (
			<div className="markup-frame">
				<iframe
					className="markup-frame-iframe"
					ref={ this.saveIframe }
				/>
			</div>
		);
	}
} );
