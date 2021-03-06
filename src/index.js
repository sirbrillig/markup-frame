import React from 'react';
import debugFactory from 'debug';

const noop = () => null;
const debug = debugFactory( 'markup-frame' );

export default React.createClass( {
	displayName: 'MarkupFrame',

	propTypes: {
		// The markup to display in the preview.
		markup: React.PropTypes.string.isRequired,
		// The handler to call when an element is clicked. Will be passed the event.
		onClick: React.PropTypes.func,
		// The function to call when the DOM is loaded. Will be passed the DOM.
		onLoad: React.PropTypes.func,
	},

	getDefaultProps() {
		return {
			markup: '',
			onClick: noop,
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

	getIFrame() {
		if ( ! this.iframe ) {
			throw new Error( 'The iframe element cannot be used because it has not been created' );
		}
		return this.iframe;
	},

	updateFrameContent( content ) {
		debug( 'adding content to iframe', content.length );
		this.getIFrame().addEventListener( 'load', this.finishPreviewLoad );
		if ( ! this.getIFrame().contentWindow || ! this.getIFrame().contentWindow.document ) {
			throw new Error( 'The iframe could not be used because it has no document object' );
		}
		this.getIFrame().contentWindow.document.open();
		this.getIFrame().contentWindow.document.write( content );
		this.getIFrame().contentWindow.document.close();
		debug( 'content added, waiting for load to complete' );
	},

	finishPreviewLoad() {
		debug( 'iframe has loaded' );
		this.props.onLoad( this.getIFrame().contentWindow.document );
		this.getIFrame().contentWindow.document.body.onclick = this.handleClick;
	},

	handleClick( event ) {
		debug( 'click detected for element', event.target );
		this.props.onClick( event );
	},

	saveIFrame( el ) {
		this.iframe = el;
	},

	render() {
		return (
			<div className="markup-frame">
				<iframe
					className="markup-frame-iframe"
					ref={ this.saveIFrame }
				/>
			</div>
		);
	}
} );
