import type { App, Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export function createInstaller(components: Plugin[]) {
    const installer = (app: App) => {
        components.forEach(component => {
            app.use(component)
        })
    }

    return installer as Plugin;
}

export function withInstall<T>(component: T) {
    (component as SFCWithInstall<T>).install = (app: App) => {
        const { name } = component as unknown as { name: string };
        app.component(name, component as any);
    }
    return component as SFCWithInstall<T>;
}