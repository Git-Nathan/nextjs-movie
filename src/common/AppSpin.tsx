import { Spin } from 'antd'

export interface IAppSpin {}

export function AppSpin(props: IAppSpin) {
  return (
    <div
      className="flex w-full justify-center"
      style={{
        margin: '35vh 0 60vh',
      }}
    >
      <Spin />
    </div>
  )
}
