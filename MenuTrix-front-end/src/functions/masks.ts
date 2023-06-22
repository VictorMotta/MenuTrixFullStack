import { FormEvent } from 'react';

export function currency(e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) {
  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
  e.currentTarget.value = e.currentTarget.value.replace(/(\d)(\d{2})$/, '$1,$2');
  e.currentTarget.value = e.currentTarget.value.replace(/(?=(\d{3})+(\D))\B/g, '.');

  return e.currentTarget.value;
}

export function currencyValue(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

  return value;
}

export function convertCents(value: string) {
  const numberFloat = parseInt(value.replace(/\./g, '').replace(',', ''));
  const cents = numberFloat;
  return cents;
}
