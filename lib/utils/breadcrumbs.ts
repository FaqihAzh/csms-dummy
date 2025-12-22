export interface BreadcrumbProps{
  label: string;
  href: string;
}

export function generateBreadcrumbs(pathname: string): BreadcrumbProps[] {
    const paths = pathname.split('/').filter(Boolean);

    const breadcrumbs: BreadcrumbProps[] = [
        { label: 'Home', href: '/' }
    ]

    let currentPath = '';
    paths.forEach((path, index) => {
        currentPath += `/${path}`

        const label = path
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());

        breadcrumbs.push({
            label,
            href: currentPath
        })
    })

    return breadcrumbs
}