import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VatModel } from '../../models/vat.model';
import type { RootState } from '../store';

type SettingsState = {
    vat: VatModel;
    currency: string;
    limit: number | null;
};

// Define the initial state using that type
const initialState: SettingsState = {
    vat: { included: true },
    currency: '',
    limit: null,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setVatRate: (state, { payload }: PayloadAction<number | null>) => {
            if (payload == null) {
                state.vat = { included: true };
            } else {
                state.vat = { included: false, rate: payload };
            }
        },
    },
});

export const { setVatRate } = settingsSlice.actions;

export const selectVat = ({ settings }: RootState) => settings.vat;
export const selectCurrency = ({ settings }: RootState) => settings.currency;
export const selectLimit = ({ settings }: RootState) => settings.limit;

export default settingsSlice.reducer;
