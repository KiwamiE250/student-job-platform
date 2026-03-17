import { getVacancies } from "@/services/vacancies"

export default async function VacanciesPage() {

  const vacancies = await getVacancies()

  return (
    <div>
      <h1>Vacancies</h1>

      {vacancies?.map(v => (
        <div key={v.id}>
          <h2>{v.title}</h2>
          <p>{v.description}</p>
        </div>
      ))}
    </div>
  )
}