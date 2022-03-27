export type VatModel =
    | {
          included: true;
      }
    | {
          included: false;
          rate: number;
      };
