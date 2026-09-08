import purohitsData from '~/data/purohits.json'

export const usePurohits = () => {
  const sanitizePurohit = (p: any) => ({ ...p })

  const getPurohits = () => {
    return purohitsData.map(sanitizePurohit)
  }

  const getPurohitBySlug = (slug: string) => {
    const purohit = purohitsData.find(p => p.slug === slug)
    return purohit ? sanitizePurohit(purohit) : undefined
  }

  return {
    getPurohits,
    getPurohitBySlug
  }
}
