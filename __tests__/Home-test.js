import 'react-native';
import React from 'react';
import Search from '../src/search/Search';
import renderer from 'react-test-renderer';

test('search snapshot', () =>{
    const snap = renderer.create(
        <Search />
    ).toJSON();
expect(snap).toMatchSnapshot();
})
