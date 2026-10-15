// The small tools, shown in a quieter list under the projects on the home
// page. Each one also has its own page, in English and Brazilian Portuguese.

import { copy, type Locale } from '@/lib/site';

type Text = Record<Locale, string>;

export type Tool = {
  slug: string;
  // Lower case in the lists, like the rest of the page.
  name: string;
  // The app's own name, for page titles and search engines.
  title: string;
  // The short line in the home page list, lower case like the rest of it.
  note: Text;
  // Paragraphs at the top of the tool page.
  about: Record<Locale, string[]>;
  // Shown with a copy button, on the home page and the tool page.
  install?: string;
  // Numbered steps, for tools Homebrew cannot install.
  steps?: Record<Locale, string[]>;
  // A note under the install command.
  more?: Text;
  needs: Text;
  repo: string;
  // A retina screenshot, drawn at half its pixel size.
  shot: { src: string; width: number; height: number; alt: Text };
  // For search engines.
  category: string;
  platform: string;
};

export const tools: Tool[] = [
  {
    slug: 'trickle',
    name: 'trickle',
    title: 'Trickle',
    note: {
      en: 'charging wattage in the menu bar',
      pt: 'watts de carga na barra de menus',
    },
    about: {
      en: [
        'Trickle shows the wattage your MacBook is charging at, live in the menu bar. It tells you when the charger is not keeping up, and it hides when the Mac is not charging.',
        'Click it to see how the power splits between the Mac, the charger and the battery. There is no settings window, no Dock icon and no network access.',
      ],
      pt: [
        'O Trickle mostra quantos watts o seu MacBook está recebendo, ao vivo na barra de menus. Ele avisa quando o carregador não dá conta e some quando o Mac não está carregando.',
        'Clique nele para ver como a energia se divide entre o Mac, o carregador e a bateria. Sem janela de ajustes, sem ícone no Dock e sem acesso à rede.',
      ],
    },
    install: 'brew install ndre-dev/tap/trickle',
    needs: {
      en: 'macOS 12 Monterey or later. The charger and Mac figures need Apple Silicon.',
      pt: 'macOS 12 Monterey ou mais recente. Os números do carregador e do Mac precisam de Apple Silicon.',
    },
    repo: 'https://github.com/ndre-dev/Trickle',
    shot: {
      src: '/tools/trickle.png',
      width: 830,
      height: 650,
      alt: {
        en: 'Trickle in the menu bar, with its menu open.',
        pt: 'O Trickle na barra de menus, com o menu aberto.',
      },
    },
    category: 'UtilitiesApplication',
    platform: 'macOS 12 or later',
  },
  {
    slug: 'unghost',
    name: 'unghost',
    title: 'Unghost',
    note: {
      en: 'clears ghost claude icons from the dock',
      pt: 'tira ícones fantasma do claude do dock',
    },
    about: {
      en: [
        'Agents in Claude and T3 Code open a headless browser, and macOS files it under the app that opened it. The Dock then fills with extra Claude or T3 Code icons that never leave.',
        'Unghost counts the extras in the menu bar and clears them in one click. Your pinned Claude icon stays. An optional guard stops new ones from appearing.',
      ],
      pt: [
        'Os agentes do Claude e do T3 Code abrem um navegador sem interface, e o macOS registra esse navegador como parte do app que o abriu. O Dock então se enche de ícones extras do Claude ou do T3 Code que nunca saem.',
        'O Unghost conta os extras na barra de menus e limpa tudo com um clique. O ícone fixo do Claude fica. Uma proteção opcional impede que novos apareçam.',
      ],
    },
    install: 'brew install ndre-dev/tap/unghost',
    more: {
      en: 'To stop new icons from appearing, install the guard from the source repository. Its README explains how.',
      pt: 'Para impedir que novos ícones apareçam, instale a proteção a partir do repositório. O README explica como.',
    },
    needs: {
      en: 'macOS 13 Ventura or later.',
      pt: 'macOS 13 Ventura ou mais recente.',
    },
    repo: 'https://github.com/ndre-dev/Unghost',
    shot: {
      src: '/tools/unghost.png',
      width: 434,
      height: 342,
      alt: {
        en: 'Unghost in the menu bar, counting four extra Claude icons.',
        pt: 'O Unghost na barra de menus, contando quatro ícones extras do Claude.',
      },
    },
    category: 'UtilitiesApplication',
    platform: 'macOS 13 or later',
  },
  {
    slug: 'glance',
    name: 'glance',
    title: 'Glance',
    note: {
      en: 'pr screenshots in a modal, for firefox',
      pt: 'screenshots de pr num modal, firefox',
    },
    about: {
      en: [
        'On GitHub, a screenshot in a pull request or issue opens in a new tab. Glance opens it in a modal instead, so the page stays where it is.',
        'Arrow keys move between the screenshots in a comment, and Escape closes the modal. There are no settings and no accounts, and it sends nothing anywhere.',
      ],
      pt: [
        'No GitHub, um screenshot num pull request ou issue abre numa nova aba. O Glance abre a imagem num modal, e a página fica onde está.',
        'As setas do teclado passam pelos screenshots de um comentário, e o Esc fecha o modal. Sem ajustes, sem contas, e nada é enviado a lugar nenhum.',
      ],
    },
    steps: {
      en: [
        'Open about:config and set xpinstall.signatures.required to false. Mozilla has not signed Glance yet, and Firefox and Zen refuse unsigned add-ons.',
        'Download Glance.xpi from the latest release.',
        'In about:addons, open the gear menu, choose Install Add-on From File and pick the file.',
      ],
      pt: [
        'Abra about:config e mude xpinstall.signatures.required para false. A Mozilla ainda não assinou o Glance, e o Firefox e o Zen recusam extensões sem assinatura.',
        'Baixe o Glance.xpi da versão mais recente.',
        'Em about:addons, abra o menu da engrenagem, escolha Instalar extensão a partir de arquivo e selecione o arquivo.',
      ],
    },
    needs: { en: 'Firefox or Zen.', pt: 'Firefox ou Zen.' },
    repo: 'https://github.com/ndre-dev/Glance',
    shot: {
      src: '/tools/glance.png',
      width: 1042,
      height: 804,
      alt: {
        en: 'A pull request screenshot open in the Glance modal on GitHub.',
        pt: 'Um screenshot de pull request aberto no modal do Glance, no GitHub.',
      },
    },
    category: 'BrowserApplication',
    platform: 'Firefox',
  },
];

// Labels on the tool pages.
export const toolCopy: Record<
  Locale,
  {
    install: string;
    needs: string;
    links: string;
    source: string;
    releases: string;
    other: string;
    copy: string;
    copied: string;
    copyLabel: string;
    home: string;
  }
> = {
  en: {
    install: 'install',
    needs: 'needs',
    links: 'links',
    source: 'source on github',
    releases: 'releases',
    other:
      'Homebrew installs the app and lets it open straight away. You can also download the latest release or build it from source.',
    copy: 'copy',
    copied: 'copied',
    copyLabel: 'Copy the install command',
    home: 'Back to the home page',
  },
  pt: {
    install: 'instalar',
    needs: 'precisa de',
    links: 'links',
    source: 'código no github',
    releases: 'versões',
    other:
      'O Homebrew instala o app e deixa ele abrir na hora. Você também pode baixar a versão mais recente ou compilar o código.',
    copy: 'copiar',
    copied: 'copiado',
    copyLabel: 'Copiar o comando de instalação',
    home: 'Voltar para a página inicial',
  },
};

export const toolPath = (locale: Locale, slug: string) =>
  locale === 'en' ? `/${slug}` : `${copy.pt.path}/${slug}`;

export const findTool = (slug: string) =>
  tools.find((tool) => tool.slug === slug);
