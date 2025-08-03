import { useNavigate } from 'react-router-dom';
import { Magnetic } from '../../../components/motion-primitives/magnetic';

export function MagneticBasic() {
    const navigate = useNavigate()
  return (
    <Magnetic>
      <button
        onClick={()=>navigate("/addMovie")}
        type='button'
        className='inline-flex items-center rounded-md border border-zinc-100 bg-transparent px-4 py-2 text-sm text-zinc-950 transition-all duration-300 hover:bg-zinc-100 dark:border-zinc-900 dark:bg-transparent dark:text-zinc-50 dark:hover:bg-zinc-600'
      >
        <span className='text-[#7dfc38]'>Add Movie</span>
      </button>
    </Magnetic>
  );
}
