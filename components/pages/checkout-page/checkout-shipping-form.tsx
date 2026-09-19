'use client';

import { Input } from '@/components/ui/input';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { z } from 'zod';

export const shippingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
});

export type ShippingInfo = z.infer<typeof shippingSchema>;

export const shippingDefaults: ShippingInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
};

interface ShippingFieldProps {
  name: keyof ShippingInfo;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
}

function ShippingField({
  name,
  label,
  placeholder,
  type = 'text',
  className,
}: ShippingFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ShippingInfo>();
  const error = errors[name];

  return (
    <Field className={className}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <div className='w-full overflow-hidden'>
        <Input
          aria-invalid={!!error}
          className='border-[#004643]/20 bg-white text-[#004643] placeholder:text-[#004643]/30'
          id={name}
          placeholder={placeholder}
          type={type}
          {...register(name)}
        />
      </div>
      {error && <FieldError>{error.message}</FieldError>}
    </Field>
  );
}

interface CheckoutShippingFormProps {
  onValidChange: (isValid: boolean) => void;
}

export function CheckoutShippingForm({
  onValidChange,
}: CheckoutShippingFormProps) {
  const form = useForm<ShippingInfo>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingDefaults,
    mode: 'onChange',
  });

  const { isValid } = form.formState;
  const prevValid = useRef(isValid);

  useEffect(() => {
    if (prevValid.current !== isValid) {
      prevValid.current = isValid;
      onValidChange(isValid);
    }
  }, [isValid, onValidChange]);

  return (
    <FormProvider {...form}>
      <div className='overflow-hidden rounded-sm border border-[#004643]/10 bg-[#f7f7ed] p-4 sm:p-5'>
        <FieldSet>
          <FieldLegend>Shipping Information</FieldLegend>
          <FieldGroup>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <ShippingField
                label='First name'
                name='firstName'
                placeholder='John'
              />
              <ShippingField
                label='Last name'
                name='lastName'
                placeholder='Doe'
              />
              <ShippingField
                label='Email'
                name='email'
                placeholder='john@example.com'
                type='email'
              />
              <ShippingField
                label='Phone'
                name='phone'
                placeholder='+1 (555) 000-0000'
                type='tel'
              />
              <ShippingField
                className='sm:col-span-2'
                label='Address'
                name='address'
                placeholder='123 Main Street'
              />
              <ShippingField
                label='City'
                name='city'
                placeholder='New York'
              />
              <ShippingField
                label='Postal code'
                name='postalCode'
                placeholder='10001'
              />
            </div>
          </FieldGroup>
        </FieldSet>
      </div>
    </FormProvider>
  );
}
