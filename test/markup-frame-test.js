import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import MarkupFrame from '../src';

describe( '<MarkupFrame />', () => {
	it( 'renders an iframe', () => {
		const wrapper = mount( <MarkupFrame markup="" /> );
		expect( wrapper.some( 'iframe' ) ).to.equal( true );
	} );

	it( 'injects props.markup into the iframe' );

	it( 'calls props.onLoad with the iframe document' );
} );
