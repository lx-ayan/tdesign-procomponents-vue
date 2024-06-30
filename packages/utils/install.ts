import type { App, Plugin } from 'vue';

type SFCWithInstall<T> = Plugin<T>;

export function createInstaller(components: Plugin[]) {
    const installer = (app: App) => {
        components.forEach(component => {
            app.use(component)
        })
    }

    return installer as Plugin;
}

export function withInstall<T>(component: T) {
    (component as any).install = (app: App) => {
        const { name } = component as { name: string };
        app.component(name, component as Plugin);
    }
    return component as SFCWithInstall<T>;
}