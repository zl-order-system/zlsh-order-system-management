export function TitleColumn({children, title}: {children?: JSX.Element[] | JSX.Element, title?: string}) {
  return (
    <div className="flex flex-col text-left gap-2.5">
      <Title title={title}/>
      {children}
    </div>
  );
}

export function Column({children, title}: {children?: JSX.Element[] | JSX.Element, title?: string}) {
  return (
    <div className="flex flex-col text-center gap-2.5">
      <Title title={title}/>
      {children}
    </div>
  )
}

const Title = ({title}: {title?: string}) => title && <div className="text-neutral-600 text-lg font-bold">{title}</div>
