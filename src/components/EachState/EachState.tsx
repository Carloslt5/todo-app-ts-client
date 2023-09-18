import { IState } from '../../types/State.type'

const EachState: React.FC<IState> = ({ stateName }) => {
  return (
    <div className='mb-4 ' >
      <h2 className='p-1 font-bold uppercase 2xl'>{stateName}</h2>
      <hr />
    </div>
  )
}

export default EachState