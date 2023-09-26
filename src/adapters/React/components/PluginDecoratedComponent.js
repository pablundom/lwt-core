import {useStateStore} from "../hooks/useStateStore.js";


export const PluginDecoratedComponent = ({component, mode, Container, ...props}) => {
    const {plugins, lwtInstance} = useStateStore();
    if (component.props?.plugins) {
        for (let p of component.props.plugins) {
            const findedPlugin = lwtInstance.findPluginById(p.name);
            if (findedPlugin) {
                const PluginContainer = findedPlugin.reactComponent;
                if (PluginContainer) {
                    Container = <PluginContainer mode={mode} key={component.id} component={component}
                                                 contains={Container}
                                                 {...props} />
                }
            }
        }
    }

    return Container;
}