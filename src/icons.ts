// Central registry for every icon used in the UI.
//
// The project relies on a single icon library: oh-vue-icons, which inlines the
// SVG into the bundle. The previous @iconify/vue setup fetched each icon from
// the Iconify API at runtime, so the grid and dock icons rendered empty on
// first load and did not work offline.
//
// New icons must be imported and passed to addIcons() here. The names used in
// templates and in data/mockProjects.ts are the kebab-case form of these
// identifiers (MdGamepad -> "md-gamepad").
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
  MdRadio,
  MdSignalcellularalt,
  BiGithub,
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
    MdRadio,
    MdSignalcellularalt,
    BiGithub,
    BiLinkedin
  )
}
