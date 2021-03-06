import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import MarkupFrame from '../src';

function mount( component ) {
	const contentArea = window.document.querySelector( '#content' );
	ReactDOM.render( component, contentArea );
}

describe( '<MarkupFrame />', function() {
	it( 'renders an iframe', function() {
		mount( <MarkupFrame markup="" /> );
		const iframes = window.document.querySelectorAll( 'iframe' );
		expect( iframes ).to.have.length( 1 );
	} );

	it( 'injects props.markup into the iframe', function() {
		mount( <MarkupFrame markup="<h1>Hello World</h1>" /> );
		const iframe = window.document.querySelector( 'iframe' );
		expect( iframe.contentWindow.document.body.innerHTML ).to.eql( '<h1>Hello World</h1>' )
	} );

	it.skip( 'calls props.onLoad with the iframe document', function( done ) {
		const onLoad = function( doc ) {
			doc.querySelector( 'h1' ).innerHTML = 'greetings';
			const iframe = window.document.querySelector( 'iframe' );
			expect( iframe.contentWindow.document.body.innerHTML ).to.eql( '<h1>greetings</h1>' );
			done();
		};
		mount( <MarkupFrame markup="<h1>Hello World</h1>" onLoad={ onLoad } /> );
	} );
} );
