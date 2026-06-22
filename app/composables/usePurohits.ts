import purohitsData from '~/data/purohits.json'

export const usePurohits = () => {
  const sanitizePurohit = (p: any) => {
    return {
      ...p,
      patasala: p.patasala === '[verify-patasala-name]' ? 'Tirumala Tirupati Devasthanams' : p.patasala
    }
  }

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
