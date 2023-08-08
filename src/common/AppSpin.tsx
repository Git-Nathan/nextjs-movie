import { Spin } from 'antd'

export interface IAppSpin {}

export function AppSpin(props: IAppSpin) {
  return (
    <div
      className="w-full flex justify-center"
      style={{
        margin: '35vh 0 40vh',
      }}
    >
      <Spin />
    </div>
  )
}
