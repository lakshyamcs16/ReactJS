import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import GussedWords from "./GuessedWords";

const defaultProps = {
    guessedWords: [
        {
            guessedWord: 'train',
            letterMatchCount: 3
        }
    ]
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<GussedWords {...setupProps} />);
}

test('does not throw warning with expected props', () => {
    checkProps(GussedWords, defaultProps);
});

describe('if there are no words guessed', () => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = setup({ guessedWords: [] });
    })

    test('renders without erros', () => {
        const component = findByTestAttr(wrapper, 'compenent-guessed-words');
        expect(component.length).toBe(1)
    });

    test('renders instruction to guess a word', () => {
        const instructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(instructions.text().length).not.toBe(0);
    })
});

describe('if there are words gussed', () => {
    let wrapper = null;
    const guessedWords = [{
        guessedWord: 'train', letterMatchCount: 3
    }, {
        guessedWord: 'agile', letterMatchCount: 1
    }, {
        guessedWord: 'party', letterMatchCount: 5
    }];

    beforeEach(() => {
        wrapper = setup({ guessedWords });
    })

    test('renders without errors',  () => {
        const component = findByTestAttr(wrapper, 'compenent-guessed-words');
        expect(component.length).toBe(1)
    });

    test('renders guessed words section', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
        expect(guessedWordsNode.length).toBe(1);
    });

    test('correct number of guessed words', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsNode).toHaveLength(guessedWords.length);
    });
});