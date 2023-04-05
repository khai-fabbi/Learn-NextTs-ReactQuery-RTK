import type { ReactElement } from 'react'

import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { UserForm, UserList } from '@/modules/users'

const UserPage: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="text-3xl font-bold text-center text-red-600">User List</h1>
      <div className="flex flex-wrap gap-2 mt-10 lg:flex-nowrap">
        <div className="w-1/2">
          <UserForm />
        </div>

        <UserList userList={[]} />
      </div>
    </section>
  )
}
UserPage.getLayout = function getLayout(page: ReactElement) {
  return <Main meta={<Meta title="User" description="User" />}>{page}</Main>
}

export default UserPage
