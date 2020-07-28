import Memcached from 'memcached'
import Config from '@/libs/config'

const memcached = new Memcached(Config.memcached.uri, Config.memcached.options)

export default memcached
