type Props = {
    btn_name: string,
    handleAction : () => void
}
export default function CustomButton({btn_name, handleAction }: Props) {
  
  return (
    <div className="bg-[#2e353c] text-white p-1 rounded cursor-pointer w-full uppercase text-center text-xs md:text-sm sm:text-sm xl:text-sm 2xl:text-sm px-2" onClick={handleAction}>
        <p>{btn_name}</p>
    </div>
  )
}
