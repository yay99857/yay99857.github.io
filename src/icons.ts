// Registro central dos ícones usados na interface.
//
// O projeto usa uma única biblioteca de ícones: oh-vue-icons. Ela embute o SVG
// no bundle, ao contrário do @iconify/vue, que buscava cada ícone na API do
// Iconify em runtime — o que fazia os ícones do grid e do dock aparecerem
// vazios no primeiro carregamento e quebrava offline.
//
// Ícones novos precisam ser importados e adicionados a addIcons() aqui; os
// nomes usados nos templates e em data/projects.ts são a versão kebab-case
// destes (MdGamepad -> "md-gamepad").
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  MdAccountcircle,
  MdArticle,
  MdBatteryfull,
  MdChevronleft,
  MdCode,
  MdDownload,
  MdEditnote,
  MdEmail,
  MdGamepad,
  MdHome,
  MdImagenotsupported,
  MdMusicnote,
  MdOpeninnew,
  MdPhotolibrary,
  MdSignalcellularalt,
  BiGithub,
  BiImage,
  BiLinkedin,
} from 'oh-vue-icons/icons'

export { OhVueIcon }

export function registerIcons() {
  addIcons(
    MdAccountcircle,
    MdArticle,
    MdBatteryfull,
    MdChevronleft,
    MdCode,
    MdDownload,
    MdEditnote,
    MdEmail,
    MdGamepad,
    MdHome,
    MdImagenotsupported,
    MdMusicnote,
    MdOpeninnew,
    MdPhotolibrary,
    MdSignalcellularalt,
    BiGithub,
    BiImage,
    BiLinkedin
  )
}
