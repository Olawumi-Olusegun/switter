import axios from 'axios'

const fetcher = async (url: string) => {
    return await axios.get(url)
                      .then((res) => res.data)
                      .catch((error) => {
                        if(error?.response.status !== 409) throw error;
                      })

}

export default fetcher;