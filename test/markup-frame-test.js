import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import MarkupFrame from '../src';

describe( '<MarkupFrame />', function() {
	it( 'renders an iframe', function() {
		const wrapper = mount( <MarkupFrame markup="" /> );
		expect( wrapper.find( 'iframe' ) ).to.have.length( 1 );
	} );

	it( 'injects props.markup into the iframe', function() {
		const wrapper = mount( <MarkupFrame markup="<h1>Hello World</h1>" /> );
		expect( wrapper.find( 'iframe' ).get( 0 ).innerHTML ).to.eql( '<h1>Hello World</h1>' )
	} );

	it( 'calls props.onLoad with the iframe document', function() {
		const onLoad = doc => doc.querySelector( 'h1' ).innerHTML = 'greetings';
		const wrapper = mount( <MarkupFrame markup="<h1>Hello World</h1>" onLoad={ onLoad } /> );
		expect( wrapper.find( 'iframe' ).get( 0 ).innerHTML ).to.eql( '<h1>greetings</h1>' )
	} );
} );
