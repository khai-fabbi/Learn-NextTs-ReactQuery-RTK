import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { object, string } from 'zod'

import type { User } from '@/models'

interface UserFormValue {
  username: string
  email: string
  age: string
  sex: 'Male' | 'Female'
}
export interface IUserFormProps {
  onSubmitFormValue?: (v: Omit<User, 'id' | 'age'> & { age: string }) => void
  userDetail?: User
}

const UserFormValueSchema = object({
  username: string({
    required_error: 'Username is required',
    invalid_type_error: 'Username must be a string',
  })
    .min(6, 'Username must be greate 6')
    .max(50),
  email: string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  })
    .min(1, 'Email is Required')
    .max(50)
    .email('This is not a valid email.'),
  age: string().min(1, 'Age is Required'),
}).partial()

export default function UserForm({
  onSubmitFormValue = () => {},
  userDetail,
}: IUserFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<UserFormValue>({
    resolver: zodResolver(UserFormValueSchema),
    defaultValues: {
      username: '',
      email: '',
      age: '',
      sex: 'Male',
    },
    mode: 'onChange',
  })
  useEffect(() => {
    if (userDetail) {
      reset({
        username: userDetail.username,
        email: userDetail.email,
        age: `${userDetail.age}`,
        sex: userDetail.sex,
      })
    }
  }, [userDetail])
  const handleSubmitForm = (
    value: Omit<User, 'id' | 'age'> & { age: string }
  ) => {
    console.log(value)

    onSubmitFormValue?.(value)
    reset({
      username: '',
      email: '',
      age: '',
      sex: 'Male',
    })
  }
  return (
    <form
      className="flex flex-col px-8 py-6 shadow-2xl gap-y-4 card w-fit"
      onSubmit={handleSubmit(handleSubmitForm)}
      autoComplete="on"
    >
      <div className="w-full max-w-xs form-control">
        <label className="label" htmlFor="name-id">
          <span className="label-text text-primary">Username</span>
        </label>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              type="text"
              placeholder="Enter your name"
              name="username"
              className={clsx(
                'w-full input input-primary placeholder:italic',
                errors.username && 'input-error'
              )}
              value={value}
              ref={ref}
              disabled={isSubmitting}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </div>

      <div className="w-full max-w-xs form-control">
        <label className="label">
          <span className="label-text text-primary">Email</span>
        </label>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              type="email"
              placeholder="Enter your content"
              className={clsx(
                'w-full input input-primary placeholder:italic',
                errors.email && 'input-error'
              )}
              name="email"
              autoComplete="on"
              value={value}
              ref={ref}
              disabled={isSubmitting}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </div>

      <div className="w-full max-w-xs form-control">
        <label className="label">
          <span className="label-text text-primary">Age</span>
        </label>
        <Controller
          control={control}
          name="age"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              type="number"
              placeholder="Enter your Age"
              className={clsx(
                'w-full input input-primary placeholder:italic',
                errors.age && 'input-error'
              )}
              value={value || ''}
              ref={ref}
              disabled={isSubmitting}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </div>

      <div className="w-full max-w-xs form-control">
        <label className="label">
          <span className="label-text text-primary">Sex</span>
        </label>
        <Controller
          control={control}
          name="sex"
          render={({ field: { onChange, onBlur, value } }) => (
            <div>
              <div className="form-control">
                <label className="cursor-pointer label hover:text-primary">
                  <span className="">Male</span>
                  <input
                    type="radio"
                    name="sex"
                    value="Male"
                    className="radio checked:bg-blue-500"
                    checked={value === 'Male'}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label hover:text-primary">
                  <span className="">Female</span>
                  <input
                    type="radio"
                    name="sex"
                    value="Female"
                    className="radio checked:bg-blue-500"
                    checked={value === 'Female'}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                </label>
              </div>
            </div>
          )}
        />
      </div>

      <button
        type="submit"
        className="mt-5 btn btn-primary"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  )
}
