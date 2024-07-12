import {atom, selector, useRecoilState, DefaultValue, useResetRecoilState} from 'recoil';

const tempFahrenheit = atom({
    key: 'tempFahrenheit',
    default: 32,
});

const tempCelsius = selector({
    key: 'tempCelsius',
    get: ({get}) => ((get(tempFahrenheit) - 32) * 5) / 9,

    set: ({set}, newValue) =>
        set(
            tempFahrenheit,
            newValue instanceof DefaultValue ? newValue : (newValue * 9) / 5 + 32
        ),
});


function TempCelsius() {
    const [tempF, setTempF] = useRecoilState(tempFahrenheit);
    const [tempC, setTempC] = useRecoilState(tempCelsius);
    const resetTemp = useResetRecoilState(tempCelsius);

    const addTenCelsius = () => setTempC(tempC + 10);
    const addTenFahrenheit = () => setTempF(tempF + 10);
    const reset = () => resetTemp();
}








interface ThirdAtomType {
    valueOne: number;
    valueTwo: number;
    multipliedValue: number;
}


const myAtom = atom<number>({
    key: 'MyAtom',
    default: 0,
});

const myOtherAtom = atom<number>({
    key: 'MyOtherAtom',
    default: 0,
});

const thirdAtom = atom<ThirdAtomType>({
    key: 'thirdAtom',
    default: {
        valueOne: 0,
        valueTwo: 0,
        multipliedValue: 0,
    },
});


interface SelectorGetResult {
    myAtomValue: number;
    myOtherAtomValue: number;
}


const transformSelector2 = selector<SelectorGetResult>({
    key: 'TransformSelector2',
    get: ({get}): SelectorGetResult => {
        const myAtomValue = get(myAtom);
        const myOtherAtomValue = get(myOtherAtom);
        return { myAtomValue, myOtherAtomValue };
    },
    set: ({set, get}, newValue: SelectorGetResult | DefaultValue) => {
        if (newValue instanceof DefaultValue) {
            set(myAtom, newValue);
            set(myOtherAtom, newValue);
        } else {
            const { myAtomValue, myOtherAtomValue } = newValue;
            set(myAtom, myAtomValue);
            set(myOtherAtom, myOtherAtomValue);
            set(thirdAtom, {
                valueOne: myAtomValue,
                valueTwo: myOtherAtomValue,
                multipliedValue: myAtomValue * myOtherAtomValue,
            });
        }
    },
});


import { activeChatIdAtom, activeChatMessagesArrayAtom, messagesFamily } from '@/state/aiAtoms/aiChatAtoms';
import { MessageType } from '@/types';








