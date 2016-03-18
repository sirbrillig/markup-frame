# MarkupFrame

A [React](https://facebook.github.io/react/) component to display raw html markup inside an iframe.

Sometimes you need to display html inside an iframe, but not it's not at a URL.  Perhaps you got the markup from an API endpoint or generated it yourself.  Maybe the markup is from a different domain and you need to be able to manipulate its DOM without cross-origin errors. For all these reasons, you can use MarkupFrame.

## Usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import MarkupFrame from 'markup-frame';

function getMarkupFromAPI() {
	return '<h1 class="article-title">Hello World!</h1><p>How are you?</h1>';
}

const FrameWrapper = React.createClass( {
	onFrameLoad( frameDocument ) {
		frameDocument.querySelector( '.article-title' ).innerHTML = 'MarkupFrame is Great!';
	},

	render() {
		return (
			<MarkupFrame markup={ getMarkupFromAPI() } onLoad={ this.onFrameLoad } />
		);
	}
} );

ReactDOM.render(
	<FrameWrapper />,
	document.getElementById( 'example' )
);
```

![MarkupFrame Example](https://cldup.com/l3pN6BBD0p.png)

## Props

* `markup`: The markup to display in the preview.
* `onClick`: (Optional) A function which will be called when any DOM element is clicked. Will be passed the raw event.
* `onLoad`: (Optional) A function which will be called when the DOM is loaded. Will be passed a reference to the DOM document object.
