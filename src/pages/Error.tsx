function ErrorPage({error}: {error: any}) {
  return (
    <div className="absolute w-screen h-screen grid place-content-center">
      <div className="flex">
        <h1 className="text-6xl text-red-600">出錯了喔</h1>
        <p>{error}</p>
      </div>
    </div>
  )
}
export default ErrorPage;
