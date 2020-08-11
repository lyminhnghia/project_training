export const getEnv = (name) => {
    const NAME = name.toString()
    console.log(process)
    return process.env[`REACT_APP_${NAME}`]
}