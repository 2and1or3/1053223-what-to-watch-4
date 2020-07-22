import React from "react";
import renderer from "react-test-renderer";

import Tabs from './tabs';
import {TabType} from '../../consts';

const film = {
  id: `1`,
  title: `the Grand Budapest Hotel`,
  poster: `img/bohemian-rhapsody.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  cover: `img/the-grand-budapest-hotel-poster.jpg`,
  isFavorite: false,
  src: `path`,
  genre: `Drama`,
  release: `2014`,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  rating: 8.9,
  voiceCount: 240,
  duration: 99,
  director: `Wes Andreson`,
  actors: [
    `Bill Murray`,
    `Edward Norton`,
    `Jude Law`,
    `Willem Dafoe`,
    `Saoirse Ronan`,
    `Tony Revoloru`,
    `Tilda Swinton`,
    `Tom Wilkinson`,
    `Owen Wilkinson`,
    `Adrien Brody`,
    `Ralph Fiennes`,
    `Jeff Goldblum`],
  commentIds: [`0`, `1`, `2`, `3`, `4`, `5`],
};

const comments = [{
  id: `0`,
  author: `Kate Muir`,
  date: `Month dd, yyyy`,
  description: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
  rate: `8,9`,
},
{
  id: `1`,
  author: `Bill Goodykoontz`,
  date: `Month dd, yyyy`,
  description: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
  rate: `7,3`,
},
{
  id: `2`,
  author: `Amanda Greever`,
  date: `Month dd, yyyy`,
  description: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
  rate: `7,4`,
}];

it(`Render Tabs component`, () => {
  const tree = renderer
    .create(<Tabs film = {film} comments = {comments} onTargetClick = {() => {}} activeItem = {TabType.OVERVIEW}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/tabs/tabs.test
