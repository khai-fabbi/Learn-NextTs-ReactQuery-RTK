import * as React from 'react'

import type { User } from '@/models'

export interface IUserListProps {
  userList: User[]
}

export default function UserList({ userList }: IUserListProps) {
  return (
    <div className="w-full px-8 py-5 bg-white shadow-2xl card">
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>username</th>
              <th>email</th>
              <th>other</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((item, idx) => {
              return (
                <tr key={item.id}>
                  <th>
                    <label>{idx + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{item.username}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.email}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">View</button>
                    <a
                      href="/update-user/<%=item.id%>"
                      className="btn btn-warning btn-xs"
                    >
                      Edit
                    </a>
                    <a
                      href="/delete-user/<%=item.id%>"
                      className="btn btn-error btn-xs"
                    >
                      Delete
                    </a>
                  </th>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
